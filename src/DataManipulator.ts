import { ServerRespond } from './DataStreamer';

export interface Row { 
  ratio: number,
  priceofABC: number,
  priceofDEF: number,
  triggerPoint: number | undefined,
  upperbound: number,
  lowerbound: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperbound = 1 + 0.05;
    const lowerbound = 1 - 0.05;

    return {
      ratio,
      priceofABC: priceABC,
      priceofDEF : priceDEF,
      upperbound,
      lowerbound,
      triggerPoint: (ratio > upperbound || ratio < lowerbound) ? ratio :undefined,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
    }
    
  //   return serverResponds.map((el: any) => {
  //     return {
  //       stock: el.stock,
  //       top_ask_price: el.top_ask && el.top_ask.price || 0,
  //       timestamp: el.timestamp,
  //     };
  //   })
  // }
    
  }
}
