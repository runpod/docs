import runpod

try:
    new_template = runpod.create_template(
        name="testing-02", image_name="runpod/base:0.4.4", is_serverless=True
    )

    print(new_template)

    new_endpoint = runpod.create_endpoint(
        name="test",
        template_id=new_template["id"],
        gpu_ids="AMPERE_16",
        workers_min=0,
        workers_max=1,
    )

    print(new_endpoint)

except runpod.error.QueryError as err:
    print(err)
    print(err.query)
