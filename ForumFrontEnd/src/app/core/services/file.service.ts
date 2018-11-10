import {Injectable} from '@angular/core';

@Injectable()
export class FileService {
  convertFileSize(bytes: number, si): string {
    if (bytes > 0) {
      let thresh: number = si ? 1000 : 1024;
      if (bytes < thresh)
        return bytes + ' B';
      let units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      do {
        bytes /= thresh;
        ++u;
      } while (bytes >= thresh);
      return bytes.toFixed(1) + ' ' + units[u];
    }
    else {
      return '-';
    }
  }

  getFileExtension(fileName) {

    let extension = fileName.substr((fileName.lastIndexOf('.') + 1));
    return extension.toLowerCase();
  }
}
