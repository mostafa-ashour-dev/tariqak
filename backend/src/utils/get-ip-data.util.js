import axios from "axios";
import ResponseError from "../classes/response-error.class";
import { IP_API_KEY } from "../config/env.config";

export async function getIpData(ip) {
    if (!ip) {
        throw new ResponseError(400, "Input Error", "IP is required");
    }

    if (ip === "::1" || ip === "127.0.0.1") {
        return {
            country_code: "EG",
            country: "Egypt",
            city: "Cairo",
            latitude: 30.0444,
            longitude: 31.2357,
        };
    }

    try {
        const { data } = await axios.get(
            `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_API_KEY}&ip=${ip}`,
            { timeout: 100000 }
        );

        if (!data || data.error) {
            return {
                country_code: "EG",
                country: "Egypt",
                city: "Cairo",
                latitude: 30.0444,
                longitude: 31.2357,
            };
        }

        return data;
    } catch (err) {
        return {
            country_code: "EG",
            country: "Egypt",
            city: "Cairo",
            latitude: 30.0444,
            longitude: 31.2357,
        };
    }
}
