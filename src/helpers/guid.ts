export class GUID {
  static generate() {
    return GUID._p8() + GUID._p8(true) + GUID._p8(true) + GUID._p8();
  }

  static _p8(s = false) {
    var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
}
