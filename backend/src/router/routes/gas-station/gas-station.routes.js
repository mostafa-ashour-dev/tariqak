import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../../middlewares/auth-user.middleware";
import {
    addGasStationLocation,
    createGasStation,
    editGasStation,
    getGasStation,
    getNearbyStations,
} from "../../../controllers/gas-station/gas-station.controller";

const router = Router();

// Create Gas Station
/* /api/v1/gas-station - POST */
router.post("/", authUser("admin"), expressAsyncHandler(createGasStation));

// Get Nearby Gas Stations
/* /api/v1/gas-station - GET */
router.get("/nearby", expressAsyncHandler(getNearbyStations));

// Get Gas Station
/* /api/v1/gas-station/:gasStationSlug - GET */
router.get("/:gasStationSlug", expressAsyncHandler(getGasStation));
// Edit Gas Station
/* /api/v1/gas-station/:gasStationSlug - PUT */
router.put(
    "/:gasStationSlug",
    authUser("admin"),
    expressAsyncHandler(editGasStation)
);

// Add Gas Station Location
/* /api/v1/gas-station/:gasStationSlug - POST */
router.post(
    "/:gasStationSlug/location",
    authUser("admin"),
    expressAsyncHandler(addGasStationLocation)
);

export default router;
