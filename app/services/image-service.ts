import {Http, ImageSource} from "@nativescript/core";

export function getImageFromHttp(url: string): Promise<ImageSource> {
    return Http.getImage(url);
}

export function getImageFromOmdb(url: string): Promise<ImageSource> {
    return new Promise<ImageSource>((resolve, reject) => {
        resolve(new ImageSource());  
    });
}