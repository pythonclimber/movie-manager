import * as httpModule from 'http';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

export function getImageFromHttp(url: string): Promise<ImageSource> {
    return httpModule.getImage(url);
}

export function getImageFromOmdb(url: string): Promise<ImageSource> {
    return new Promise<ImageSource>((resolve, reject) => {
        resolve(new ImageSource());  
    });
}