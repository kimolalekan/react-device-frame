## React Devices
React wrapper for device frame.

**Supported devices**

iPhone X (Silver)

iPhone 8 (Silver, Gold and Space Gray)

Google Pixel (Very Silver, Quite Black and Really Blue)

Samsung Galaxy S8 ( Midnight Black and Coral Blue)

iPad Pro (Silver, Gold, Rose Gold and Space Gray)

MacBook (Silver, Gold, Rose Gold and Space Gray)

MacBook Pro (Silver and Space Gray)

Surface Studio

iMac Pro

Apple Watch


**Installations**
```bash
$ npm i react-device --save
```

**Usage**

```javascript
import React, {Component} from "react";
import Device from "react-devices";

class myDevice extends Component {

  render (){
    return (
      <Device device="iphone-8" color="gold" url="https://www.google.com" />
    )
  }
}

export default myDevice;
```

**Properties**

| Property  | Value   |  Type |  
|---|---|---|
|  device |  iphone-x, iphone-8, google-pixel, galaxy-s8, ipad-pro, surface-pro |  string |
| color  |silver, spacegray, black, gold, rosegold, blue   |  string |
|  url |e.g https://www.google.com   |  string | |

**LICENSE: MIT**

**Developer:** Olalekan Animashaun
