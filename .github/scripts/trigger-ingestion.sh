#!/usr/bin/env bash
#
# Triggers the ingestDocsWorkflow on the Runpod Assistant.
# Used by GitHub Actions to sync documentation changes.
#
# Required environment variables:
#   RUNPOD_ASSISTANT_BASE_URL - Base URL of the assistant API
#   RUNPOD_ASSISTANT_API_KEY  - API key for authentication
#
# Optional:
#   VALIDATE_ONLY=true - Only validate config, don't trigger ingestion
#

set -euo pipefail

# --- Configuration ---
WORKFLOW_ID="ingestDocsWorkflow"
TIMEOUT_SECONDS=30

# --- Helper Functions ---

log()       { echo "$*"; }
log_ok()    { echo "[OK] $*"; }
log_error() { echo "::error::$*"; }

check_required_var() {
    local var_name="$1"
    local fix_location="$2"

    if [ -z "${!var_name:-}" ]; then
        log_error "$var_name is not configured"
        log ""
        log "To fix: Go to Settings > Secrets and variables > Actions > $fix_location"
        log "Add: $var_name"
        exit 1
    fi
    log_ok "$var_name is configured"
}

# Makes an API request and handles the response
# Returns: 0 on success, 1 on failure
api_request() {
    local endpoint="$1"
    local data="$2"
    local description="$3"

    log "$description..."

    # Make request, capture response and status separately
    local http_status
    local response

    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
        --max-time "$TIMEOUT_SECONDS" \
        -X POST \
        "${RUNPOD_ASSISTANT_BASE_URL}/api/workflows/${WORKFLOW_ID}/${endpoint}" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${RUNPOD_ASSISTANT_API_KEY}" \
        -d "$data")

    # Extract status code from response
    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
    response=$(echo "$response" | grep -v "HTTP_STATUS:")

    # Handle response based on status code
    case "$http_status" in
        200)
            log_ok "$description succeeded"
            return 0
            ;;
        401|403)
            log_error "$description failed - Authentication error (HTTP $http_status)"
            log ""
            log "Response: $response"
            log ""
            log "Cause: The API key was rejected"
            log "To fix: Check RUNPOD_ASSISTANT_API_KEY in repository secrets"
            return 1
            ;;
        404)
            log_error "$description failed - Workflow not found (HTTP $http_status)"
            log ""
            log "Response: $response"
            log ""
            log "Cause: Workflow '$WORKFLOW_ID' doesn't exist at this endpoint"
            log "To fix: Verify workflow is deployed at $RUNPOD_ASSISTANT_BASE_URL"
            return 1
            ;;
        500|502|503|504)
            log_error "$description failed - Server error (HTTP $http_status)"
            log ""
            log "Response: $response"
            log ""
            log "Cause: The assistant service returned an error"
            log "To fix: Check if runpod-assistant is healthy, then retry"
            return 1
            ;;
        *)
            log_error "$description failed - Unexpected error (HTTP $http_status)"
            log ""
            log "Response: $response"
            return 1
            ;;
    esac
}

# --- Main ---

main() {
    log "=== Docs Ingestion Workflow ==="
    log ""

    # Validate required environment variables
    log "Checking configuration..."
    check_required_var "RUNPOD_ASSISTANT_BASE_URL" "Variables"
    check_required_var "RUNPOD_ASSISTANT_API_KEY" "Secrets"
    log ""

    # Generate unique run ID
    local run_id
    run_id=$(uuidgen | tr '[:upper:]' '[:lower:]')

    if [ "${VALIDATE_ONLY:-false}" = "true" ]; then
        run_id="validation-$run_id"
    fi

    log "Run ID: $run_id"
    log ""

    # Step 1: Create workflow run
    if ! api_request "create-run?runId=$run_id" '{}' "Creating workflow run"; then
        exit 1
    fi

    # If validation only, stop here
    if [ "${VALIDATE_ONLY:-false}" = "true" ]; then
        log ""
        log "=== Validation Complete ==="
        log "Configuration is valid - safe to merge"
        exit 0
    fi

    # Step 2: Start workflow run
    if ! api_request "start?runId=$run_id" '{"inputData": {"branch": "main"}}' "Starting workflow run"; then
        exit 1
    fi

    log ""
    log "=== Success ==="
    log "Docs ingestion workflow triggered"
}

main "$@"
