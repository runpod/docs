---
title: "Updating Your Endpoint"
slug: "updating-your-endpoint"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Jun 27 2023 01:34:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 13 2023 18:09:42 GMT+0000 (Coordinated Universal Time)"
---

There are two methods of updating your endpoint from the UI.

1. Replace the image used within the template.
2. Re-assign your endpoint to a new template.

You can programmatically update your endpoint via CICD or other scripts using the following queries.

To update the number of min and max workers, you can use the following two mutations.

Minimum Workers control the amount of workers that will be provisioned no matter your queue status. **Please keep in mind that these workers will be long lived and billed for every second that they are active.** They are great for if you know that your request volume is stable and you want to keep workers around to make sure users have the best experience. Alternatively, it's sometimes good to set a minimum worker count when debugging your workers.

```
mutation UpdateEndpointWorkersMin {
  updateEndpointWorkersMin(
    input: { endpointId: "myEndpointId", workerCount: 1 }
  ) {
    id
    workersMin
    workersMax
  }
}
```

Maximum workers control two things. The first (**and probably the less intuitive**) thing it controls is your endpoint's caching coefficient. **This means that the higher your max worker count, the more we prioritize your workers to be cached and ready.** This is partially why we limit new accounts to a relatively low max concurrency at the account level. If you want to get this number raised, you generally will need to have a higher history of spending, or commit to a relatively high spend per month. The second, and more obvious, thing it controls is the maximum concurrency for your endpoint. You should generally aim to set your max worker count to be 20% higher than you expect your max concurrency to be.

```
mutation UpdateEndpointWorkersMax {
  updateEndpointWorkersMax(
    input: { endpointId: "myEndpointId", workerCount: 3 }
  ) {	
    id
    workersMin
    workersMax
  }
}
```

Lastly, you can update your template by using the template ID. We currently recommend that you have two templates for your production deployment. This way, you can swap between them when deploying new changes. Currently, we swap container images based on the name:tag combination, so make sure that the two templates you are swapping between have different name:tag combinations. Once you swap the template, the serverless autobalancer will slowly start to cycle out the older containers for newer containers to prevent downtime. If you want to expedite this process and do not mind downtime, you can set your minimum/maximum workers to 0 before doing this. Setting your counts to 0 will force flush the existing container cache.

```
mutation UpdateEndpointTemplate {
  updateEndpointTemplate(
    input: { endpointId: "myEndpointId", templateId: "myTemplateId" }
  ) {
    id
    templateId
  }
}
```
