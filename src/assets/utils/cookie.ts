import * as Cookie from "js-cookie";

const NAME = {
  REPEL_PER_DAY: "repelPerDay"
};

const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1));
tomorrow.setHours(4);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);

const expiredMsTime = tomorrow;

const OPTS = {
  expires: expiredMsTime
};

const _setCookie = (name: string, value: string) => {
  return Cookie.set(name, value, OPTS);
};

const _getCookie = (name: string) => {
  return Cookie.get(name);
};

// @ts-ignore
const _getCookieAsJson = (name: string): object => {
  return Cookie.getJSON(name);
};

export const getRepelPerDay = (): number => {
  return Number(_getCookie(NAME.REPEL_PER_DAY));
};

export const setRepelPerDay = (val: number) => {
  return _setCookie(NAME.REPEL_PER_DAY, String(val));
};
