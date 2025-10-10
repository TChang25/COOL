# LocationAPI

## LocationController
### GET All Locations
First, navigate to our `LocationController` URL: `http://localhost:8080/api/locations`. This page should load without errors and display the test items from the `location` table in the database.

![alt text](../../../MD2_images/ApiLocationsPage.png)

Next, open a new Postman tab, select the `GET` method, and enter the same URL to retrieve a list of all locations stored in the database.

![alt text](../../../MD2_images/GetAllLocations.png)

### GET Single Location
Use the `GET` method to retrieve a specific location by its ID. Replace `{id}` with the numeric ID of the location you want to retrieve.
**URL:**
`http://localhost:8080/api/locations/{id}`

![alt text](../../../MD2_images/GetSelectedID.png)

### POST a New Location
The `POST` method allows us to create a new location in the database. In Postman, select `POST`, set the URL to `http://localhost:8080/api/locations`, and use the `Body` tab with `raw` JSON.

**Example JSON:**

```JSON
{
    "locationName": "West Side Center",
    "address": "789 Pine Rd, Orlando, FL"
}
```

![alt text](../../../MD2_images/PostLocationData.png)

### PUT / Update Location
The `PUT` method updates an existing location. Replace `{id}` with the location ID you want to update, then provide the updated information in the body as raw JSON.

**Example JSON for update:**
```JSON
{
    "locationName": "Downtown Hub",
    "address": "123 Main St, Orlando, FL"
}
```

![alt text](../../../MD2_images/PutUpdate.png)

### DELETE a Location
The `DELETE` method removes a specific location from the database. Replace `{id}` with the ID of the location to delete.

**URL:**

![alt text](../../../MD2_images/DELETElocation.png)

Now that we’ve tested the Location endpoints in real time, we will apply the same testing approach to the remaining controllers.

## UserLocationController

### GET All User-Locations
URL: `http://localhost:8080/api/user-locations`

![alt text](../../../MD2_images/GetListUserLocation.png)

### GET Single User-Location
URL: `http://localhost:8080/api/user-locations/{id}`

![alt text](../../../MD2_images/GetSelectedUserLocation.png)

### POST a New User-Location
URL: `http://localhost:8080/api/user-locations`
Method: POST
Body (raw JSON using userId and locationId):
```JSON
{
    "userId": 5,
    "locationId": 1
}
```

![alt text](../../../MD2_images/PostUserLocation.png)

### PUT / Update User-Location
URL: `http://localhost:8080/api/user-locations/{id}`
Method: PUT
Body (raw JSON):
```JSON
{
    "userId": 5,
    "locationId": 2
}
```

![alt text](../../../MD2_images/PutUserLocation.png)

### DELETE a User-Location
URL: `http://localhost:8080/api/user-locations/{id}`
Method: DELETE

![alt text](../../../MD2_images/DeleteUserLocation.png)