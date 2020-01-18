// importScripts('imageManips.js');
import { manipulate } from './imageManips'


onmessage = function (e) {
  const imageData = e.data.data;
  const type = e.data.type;

  try {
    let length = imageData.data.length / 4;
    let j, i, ref, r, g, b, a


    for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];
      let pixel = manipulate(type, r, g, b, a);
      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }
    postMessage(imageData);
  } catch (e) {
    function ManipulationException(message) {
      this.name = "ManipulationException";
      this.message = message;
    };
    throw new ManipulationException('Image manipulation error');
    postMessage(undefined);
  }
}