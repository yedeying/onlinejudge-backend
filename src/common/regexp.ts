export const pageId = /^([A-Z]{1,2})$/;
export const problemNo = /^([A-Z]{1,2})(\d{2})$/;
export const username = /^[a-zA-Z\d._+-|$#%/\\@]{4,50}$/;
export const password = /^[a-zA-Z\d._+-|$#%/\\@]{4,50}$/;
export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const uuid = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/;
export const uuid = /^.*$/;
