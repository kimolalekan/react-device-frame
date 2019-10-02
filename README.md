## React Device Frame

This is a rewrite of [Olalekan Animashaun](https://kimolalekan.github.io/#)'s React wrapper for [Devices.css](http://marvelapp.github.io/devices.css/). It adds a snazzy &lt;Dock&gt; component to put your &lt;Device&gt; frame in and allows you to load whatever you want to into the &lt;Device&gt; through props.show or as &lt;Device&gt;{children}&lt;/Device&gt;

Preview: none yet...dev folder soon, [storybook](https://github.com/storybookjs/storybook) later.

**Supported devices**

- iPhone X (Silver)

- iPhone 8 (Silver, Gold and Black)

- iPhone 8 Plus (Silver, Gold and Black)

- iPhone 5S (Silver, Gold and Black)

- iPhone 5C (White, Red, Yellow, Green and Blue)

- iPhone 4S (Silver, Gold and Black)

- iPad (White and Black)

- MacBook Pro

- Samsung Galaxy S5

- Samsung Galaxy Note 8

- HTC one

- Nexus 5

- Lumia 920 (White, Red, Yellow, Black and Blue)


**Installation... npm? not yet.**

... no npm package for this version, **so you can’t do this**:

```bash
npm i react-device-frame --save
```

**Installation... for now.**

clone the project into a subfolder of your [CRA](https://github.com/facebook/create-react-app ) project. I like `src/lib/`.

```bash
cd your/CRA-project-folder/src
mkdir lib && cd lib
git clone https://github.com/perfectcube/react-device-frame.git
```

Drop this into your `src/jsconfig.json` file:  

```json
{
  ...
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "": ["src/"]
    }
  }
  ...
}
```

... and you're off to the races!

**Usage**

```jsx
import React, { Component } from "react";
import Device from "lib/react-device-frame";

class ShowWebpage extends Component {
  render() {
    // NOTE: You'll have a rough time displaying a website in Chrome that's sending back a 'X-Frame-Options=sameorigin' header. You'll get an error in the console like: 
    // Refused to display 'https://www.google.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
    // Try one of these instead: http://mentalfloss.com/article/53792/17-ancient-abandoned-websites-still-work ... Maybe learn Klingon? https://www.kli.org/
    return <Device use="iphone-8" color="gold" show="https://www.kli.org/" />;
  }
}

class ShowComponents extends Component {
  render() {
    const content = (
      <div>
      	<p>this is content</p>
      	<p>wahtever you want to have in here is fine</p>
      	<Button>I'm a custom component</Button>
      </div>
    );
    return <Device use="iphone-5c" show={content} color="red" />;
  }
}

class ShowComponentsAsChildren extends Component {
  render() {
    return (
      <Device use="macbook-pro">
      	<div>
      		<p>this is content</p>
      		<p>wahtever you want to have in here is fine</p>
      		<Button>I'm a custom component</Button>
      	</div>
    	</Device>
    );
  }
}

class SpiffyMobileDevicesDock extends Component {
  
  updatePreview(data){
    console.log({
      'got update from <Dock>':data
    });
  }
  
  render() {
    
    const content = (
      <div>
      	<p>this is content</p>
      	<p>wahtever you want to have in here is fine</p>
      	<Button>I'm a custom component</Button>
      </div>
    );
    
    return (
    	<Dock
        device="iphone-x" 
        tooltip="Show a mobile Preview" 
        open="Mobile Preview" 
        close="Hide Preview"
        zoom={{
          full: "Huge",
          large: "Large",
          med: "Medium",
          small: "Small",
        }}
        view="large"
        onData={(update)=>{
          this.updatePreview(update);
        }}
        hide={['ipad','macbook-pro']}
        padTop={55}
        orientation="protrait"
       >
				<Device 
        	use="iphone-x"
          color="black" 
          orientation="protrait"
         >{content}</Device>
       </Dock>
    );
  }
  
}
```

**&lt;Device&gt; Properties**

| Property    | Value                                                        | Type                               |
| ----------- | ------------------------------------------------------------ | ---------------------------------- |
| use         | iphone-x, iphone-8, iphone-8plus, iphone-5s, iphone-5c, iphone-4s, ipad-mini, nexus-5, htc-one, galaxy-s5, galaxy-note8, macbook-pro; default is iphone-x | string                             |
| color       | Depends on the device. Use Device.getColors('device-name') to get all supported colors and use Device.getColor('device-name') to get the device default color. | string                             |
| show        | A url or any &lt;Component&gt;. Show is optional but &lt;Device&gt; won’t show anything unless you declare show={something} or give &lt;Device&gt;&lt;p&gt;a child&lt;/p&gt;&lt;/Device&gt;. Note that we don’t check if you're passing in a valid url... enjoy! | string<br/>component<br/>undefined |
| orientation | one of **protrait** or **landscape**.                        | string                             |
| title       | Only used as the title attribute in the &lt;iframe&gt; if props.show is a url | string                             |

**&lt;Dock&gt; Properties**

| Property | Value                                                        | Type     |
| -------- | ------------------------------------------------------------ | -------- |
| device   | **(required)** The initially selected device in the device switcher pulldown | string   |
| view     | (**required**) The zoom level that you want to show the device at. One of 'full', 'large', 'med', or 'small'. | string   |
| close    | **(optional)** The text on the dock close button             | string   |
| open     | **(optional)** The text on the dock open button              | string   |
| zoom     | **(optional)** The text on the zoom selector options. The default values are: <br/>{<br/>          full: "Huge",<br/>          large: "Large",<br/>          med: "Medium",<br/>          small: "Small",<br/>} | object   |
| onData   | **(optional)** A callback that recieves all selected options as a single argument whenever you change an option.  The object you're passed has the following keys<br />• zoom {string} one of: 'full','large','med','small'. this is the currently selected zoom level. <br/>• device {string} one of Device.SUPPORTED_DEVICES, like: "the-device-slug"<br/>• orient {string} "landscape" or "portrait" <br/>• color {string} the currently selected human readable color name. Map this to the #hex color for the <Device/> with Device.colorMap('device-type','color')<br/>• float {string} "right" or "left" | function |
| hide     | (**optional**) An array of devices to remove from the device selector pulldown. For example, if you wanted to only show phones in the <Dock>'s device selection pulldown you'd do this: hide={['macbook-pro','ipad']}. See: <Device> › Properties › use for valid values. | array    |
| show     | (**optional**) Let’s you turn off visual elements within the &lt;Dock/&gt;. You have these options, **bold** is default:<br/>• zoom: [**true** \| false] The device zoom pulldown<br/>•switcher: [**true** \| false] The device frame switcher pulldown<br/>•color: [**true** \| false] The color selector<br/>•float: [**true** \| false] The drawer position button <br/> orientation: [true \| false] -- not implimeted yet.<br/>Example:<br/>show={{color:false}} <br/>This would hide the color selection menu for all devices. | object   |
| padTop   | (**optional**) A number of pixels that you want to pad the top of the dock down from the top of the window frame. Handy if you're displaying the dock with a header reagion that you don’t want to overlap with the device. | int      |
| tooltip  | (**optional**) Shows a &lt;ReactTooltip&gt; for the &lt;Dock&gt; open button if you pass in a string. | string   |

LICENSE: **MIT**

**Developer:** [Dan Bryant](https://github.com/cube-dan). **Original Author:** [Olalekan Animashaun](https://kimolalekan.github.io)