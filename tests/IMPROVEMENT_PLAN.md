# Testing Framework Improvement Plan

Based on feedback from PR #561 review by @runpod-Henrik.

## Immediate Fixes (Blockers)

### 1. MCP tool name typo
**File:** `.claude/testing.md` line 31
**Issue:** References `mcp__runpod-dops__search_runpod_documentation` but server is `runpod-docs`
**Fix:** Change to `mcp__runpod-docs__search_runpod_documentation`
**Status:** [x] DONE

### 2. Test table format mismatch
**Files:** `tests/README.md`, `.claude/testing.md`, `tests/TESTS.md`
**Issue:** Docs say tables have `ID | Goal | Cleanup` but actual tables have `ID | Goal | Difficulty`
**Options:**
- A) Add Cleanup column back to tables (more explicit per-test)
- B) Update docs to say cleanup rules are global (simpler, current reality)
**Recommendation:** Option B - cleanup rules ARE global (by resource type), not per-test
**Status:** [x] DONE - Updated docs to describe actual format with global cleanup rules

### 3. Port limit accuracy
**File:** `runpodctl/reference/runpodctl-create-pod.mdx`
**Issue:** Changed from "1 HTTP + 1 TCP" to "10 HTTP + multiple TCP" - needs verification
**Action:** Verify actual runpodctl behavior before merging
**Status:** [x] VERIFIED - `pods/configuration/expose-ports.mdx` confirms "Expose HTTP Ports (Max 10)"

## Nits

### 4. Missing trailing newline in .gitignore
**Status:** [x] DONE

### 5. Double `---` separator in TESTS.md
**Status:** [x] DONE

---

## Structural Improvements (Future Work)

Henrik correctly identified that this is currently a **catalog**, not a **framework**. Here's a plan to evolve it:

### Phase 1: Cleanup Safety Net (Quick Win)
**Status:** ✅ DONE

Created `tests/scripts/cleanup.py`:
- Lists and deletes resources matching `doc_test_*` prefix
- Supports dry-run mode (default) and `--delete` flag
- Handles pods, endpoints, templates, and network volumes
- Can be run standalone or in CI

Also updated `.claude/testing.md` with cleanup instructions for Claude Code.

### Phase 2: Smoke Test Tier
**Status:** ✅ DONE

Added 12 smoke tests that don't require GPU deploys:
- SDK installs: `sdk-python-install`, `sdk-js-install`
- CLI: `cli-install`, `cli-configure`, `cli-list-pods`
- Read-only: `template-list`, `serverless-metrics`
- Config: `api-key-create`, `pods-add-ssh-key`
- Public endpoints: `public-flux`, `public-qwen`, `public-video`

Created separate "Smoke Tests" section in TESTS.md.
Updated `.claude/testing.md` with test tier instructions.

### Phase 3: Success Criteria
**Status:** ✅ DONE

Added "Expected Outcome" column to all test tables with objective, measurable criteria:
- `Pod status is RUNNING`
- `Endpoint responds to /health`
- `SSH session established`
- etc.

Now each test has a clear PASS/FAIL condition.

### Phase 4: Automation Layer
**Status:** ⏸️ DEFERRED

Requires Claude Code in CI or custom API runner. Skipped for now - tests run manually.

Options for future:
1. Claude Code headless mode (when available)
2. Custom runner script with Anthropic API
3. GitHub Action with Claude CLI

### Phase 5: Results Tracking
**Status:** ✅ DONE

- Reports saved to **two locations**:
  - `tests/reports/` (gitignored, in repo)
  - `~/Dev/doc-tests/` (persistent local archive)
- Enhanced report template with:
  - Git SHA and branch
  - Structured metadata table
  - Steps taken section
  - Actual vs expected results
- Instructions for comparing runs over time

### Phase 6: Convenience Tooling (Added)
**Status:** ✅ DONE

Based on trial run feedback, added:

1. **`/test` command** (`.claude/commands/test.md`)
   - Loads test definition and execution rules
   - Supports `local` flag for local docs mode
   - Supports `smoke` for running smoke tests

2. **`report.py` script** (`tests/scripts/report.py`)
   - Auto-generates report template with metadata
   - Pulls goal and expected outcome from TESTS.md
   - Saves to both report locations

3. **`stats.py` script** (`tests/scripts/stats.py`)
   - Analyzes historical test reports
   - Shows pass rates overall and by test
   - Lists recent runs and failures

### Phase 7: GPU Fallback Guidance (Added)
**Status:** ✅ DONE

Based on flash-quickstart test failure (RTX 4090 unavailable), added:

1. **Queue timeout thresholds** - When to wait vs try fallback
2. **Fallback GPU order** - L4 → A4000 → RTX 3090
3. **Cloud type fallbacks** - Secure → Community
4. **Status marking guidance** - PASS/PARTIAL/FAIL based on GPU used

---

## Discussion Points

1. **How often should full suite run?** Weekly? Monthly? On-demand only?
2. **Budget for test runs?** ~$5-10 per full run was mentioned
3. **Who reviews test reports?** Auto-file issues for failures?
4. **Should we version the test definitions?** Track which tests existed at which doc version?

---

## Next Steps

1. ~~Fix blockers (#1, #2, #3, #4, #5) immediately~~ ✅ All complete
2. Merge PR with fixes
3. Create issues for Phase 1-5 improvements
4. Discuss automation priorities with team
