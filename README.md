## React Device Frame

React wrapper for device frame based on [Devices.css](http://marvelapp.github.io/devices.css/).

Devices preview: [Demo](http://device.kraftkin.com/)

**Supported devices**

iPhone X (Silver)

iPhone 8 (Silver, Gold and Black)

iPhone 8 Plus (Silver, Gold and Black)

iPhone 5S (Silver, Gold and Black)

iPhone 5C (White, Red, Yellow, Green and Blue)

iPhone 4S (Silver, Gold and Black)

iPad (White and Black)

MacBook Pro

Samsung Galaxy S5

Samsung Galaxy Note 8

HTC one

Nexus 5

Lumia 920 (White, Red, Yellow, Black and Blue)

**Installation**

```bash
$ npm i react-device-frame --save
```

**Usage**

```javascript
import React, { Component } from "react";
import Device from "react-device-frame";

class myDevice extends Component {
  render() {
    return <Device name="iphone-8" color="gold" url="https://www.google.com" />;
  }
}

export default myDevice;
```

**Properties**

| Property  | Value                                                                                                                                | Type    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| name      | iphone-x, iphone-8, iphone-8plus, iphone-5s, iphone-5c, iphone-4s, ipad-mini, nexus-5, htc-one, galaxy-s5, galaxy-note8, macbook-pro | string  |
| color     | white, red, yellow, black, blue, gold, silver                                                                                        | string  |
| url       | e.g https://www.google.com                                                                                                           | string  |
| portrait  | true, false                                                                                                                          | boolean |
| landscape | true, false                                                                                                                          | boolean |

**LICENSE: MIT**

**Developer:** Olalekan Animashaun
