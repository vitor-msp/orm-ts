export abstract class ObjToMap {
  static convert<T>(obj: any): Map<string, T> {
    const keyValuePairs = this.getKeyValuePairs<T>(obj);
    const map = new Map<string, T>(keyValuePairs);
    return map;
  }

  private static getKeyValuePairs<T>(obj: any): Iterable<readonly [string, T]> {
    return Object.keys(obj).map((key) => [key, obj[key]]);
  }
}
