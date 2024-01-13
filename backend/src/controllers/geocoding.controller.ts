import { ParamsDictionary } from 'express-serve-static-core';
import { NextFunction, Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IsString } from 'class-validator';

export class GeoCodingCoordinatesRequest {
  @IsString()
  query: string;
}

interface GeoCodingCoordinatesResponse {
  fullAddressSuggestion: string;
  lng: number;
  lat: number;
}

/**
 * Used to avoid mixed content errors in production because the API used does not support HTTPS.
 *
 * Browsers will block attempts to load insecure active content like AJAX calls on secure (HTTPS) pages.
 *
 * Should not be kept if the geocoding API changes because it could be called client side to reduce latency.
 */
class GeoCodingController {
  public search = async (
    req: Request<
      ParamsDictionary,
      GeoCodingCoordinatesResponse,
      GeoCodingCoordinatesRequest
    >,
    res: Response<GeoCodingCoordinatesResponse>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await axios.post<
        GeoCodingCoordinatesResponse,
        AxiosResponse<
          GeoCodingCoordinatesResponse,
          GeoCodingCoordinatesRequest
        >,
        GeoCodingCoordinatesRequest
      >('http://ouhabiter.ca/api/geocoding/coordinates', req.body);

      res.status(200).json(response.data);
    } catch (error) {
      // Replicate API response safely to help in debugging.
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response;

        const contentType = errorResponse.headers['content-type'];
        if (contentType && typeof contentType === 'string') {
          res.header('content-type', contentType);
        }

        res.statusCode = errorResponse.status;
        res.statusMessage = errorResponse.statusText;

        res.send(errorResponse.data);
      } else {
        next(error);
      }
    }
  };
}

export default GeoCodingController;
