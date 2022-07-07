/**
 * @author Icon
 * @description: //TODO
 * @date 2022-07-06 16:48
 */
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import worldMap from './world-palestine-highres.geo.json';
import routes from './lines.json';
import img1 from './world.jpg';
import img2 from './air.jpg';
import earth from './earth.jpg';
import starfield from './starfield.jpg';

const options1 = {
  geo3D: {
    map: 'worldMap',
    shading: 'realistic',
    silent: true,
    environment: '#333',
    realisticMaterial: {
      roughness: 0.8,
      metalness: 0
    },
    postEffect: {
      enable: true
    },
    groundPlane: {
      show: false
    },
    light: {
      main: {
        intensity: 1,
        alpha: 30
      },
      ambient: {
        intensity: 0
      }
    },
    viewControl: {
      distance: 70,
      alpha: 89,
      panMouseButton: 'left',
      rotateMouseButton: 'right'
    },
    itemStyle: {
      color: '#000'
    },
    regionHeight: 0.5
  },
  series: [
    {
      type: 'lines3D',
      coordinateSystem: 'geo3D',
      effect: {
        show: true,
        trailWidth: 1,
        trailOpacity: 0.5,
        trailLength: 0.2,
        constantSpeed: 5
      },
      blendMode: 'lighter',
      lineStyle: {
        width: 0.2,
        opacity: 0.05
      },
      data: routes
    }
  ]
}
const options2 = {
  animation: true,
  backgroundColor: '#000',
  globe: {
    baseTexture: earth,
    heightTexture: img2,
    environment: starfield,
    shading: 'lambert',
    atmosphere: {
      show: true
    },
    viewControl: {
      autoRotate: false,
    },
    light: {
      main: false,
      ambient: false,
      ambientCubemap: {
        texture: earth,
      }
    }
    // 云层设置
    // layers: [
    //   { 
    //     show: true,
    //     type: 'overlay',
    //     name: 'cloud',
    //     texture: 'texture'
    //   }
    // ],
  },
  series: {
    type: 'lines3D',
    coordinateSystem: 'globe',
    blendMode: 'lighter',
    effect: {
        show: true,
        trailWidth: 1,
        trailOpacity: 0.5,
        trailLength: 0.2,
        constantSpeed: 5
      },
    lineStyle: {
      width: 1,
      color: 'rgb(50, 50, 150)',
      opacity: 0.65
    },
    data: routes
  }
}
const Index = () => {
  const [isChangeMap, setIsChangeMap] = useState<boolean>(true);
  const myChart = useRef<any>();
  useEffect(() => {
    myChart.current = echarts.init(document.getElementById('3dmap') as HTMLElement);
    echarts.registerMap('worldMap', worldMap as any);
    myChart.current?.setOption(options2);
  }, [])
  const onChangeMap = () => {
    setIsChangeMap(prevState => {
      myChart.current?.clear();
      myChart.current?.setOption(!!isChangeMap ? options1 : options2);
      return !!!prevState;
    })
  }
  return (
    <div>
      <button onClick={onChangeMap}>切换</button>
      <div id="3dmap" style={{ width: '100vw', height: 800 }}></div>
    </div>
  )
}

export default Index;

