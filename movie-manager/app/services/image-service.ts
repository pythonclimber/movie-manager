import * as httpModule from 'http';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

export function getImageFromHttp(url: string): Promise<ImageSource> {
    return httpModule.getImage(url);
}