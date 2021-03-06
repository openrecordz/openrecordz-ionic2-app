import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecordService {

  //data: any;
  urlApi: String;

  constructor(public http: Http, config: Config) {
    console.log('Hello RecordService Provider');
    this.urlApi=config.get("urlApi");
    console.log("urlApi : "+ this.urlApi);
  }

load(datasetId:String, page:number=0) {
 // if (this.data) {
    // already loaded data
  //  return Promise.resolve(this.data);
 // }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
	this.http.get(this.urlApi+'/datasets/'+datasetId+'?page='+page)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
      //  this.data = data;
      //resolve(this.data);

      resolve(data);

     /*   this.data = this.applyHaversine(data);
        */

      });
  });
}

//https://www.joshmorony.com/create-a-nearby-places-list-with-google-maps-in-ionic-2-part-2/
applyHaversine(locations){

        let usersLocation = {
            lat: 40.713744,
            lng: -74.009056
        };

        locations.map((location) => {

            let placeLocation = {
                lat: location.latitude,
                lng: location.longitude
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });

        return locations;
    }

     getDistanceBetweenPoints(start, end, units){

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;

    }

    toRad(x){
        return x * Math.PI / 180;
    }


}
