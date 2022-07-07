import React, { useEffect, useState } from 'react';
import yayJpg from '@assets/yay.jpg';
import { useClientLoaderData } from 'umi';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function HomePage() {
  const [visitorId, setVisitorId] = useState<string>();
  const data = useClientLoaderData();
  const fpPromise = FingerprintJS.load();
  const getId = async () => {
    const fp = await fpPromise
    const result = await fp.get()
    setVisitorId(result.visitorId)
  }
  useEffect(() => {
    getId();
  }, [])
  return (
    <div>
      <h2>visitorId: {visitorId}</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>

    </div>
  );
}

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        timestamp: new Date().getTime(),
      })
    }, 1000)
  })
}

// export async function clientLoader() {
//   const data1 = await getData();
//   const data2 = await getData();
//   const data3 = await getData();
//   return data1;
// }
