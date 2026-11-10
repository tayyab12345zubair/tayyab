import { EventEmitter } from "events";

class HubEmitter extends EventEmitter {}

export const hubEmitter = new HubEmitter();