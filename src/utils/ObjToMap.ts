export abstract class ObjToMap {
  static convert<T>(obj: any): Map<string, T> {
    const map = new Map<string, T>(
      Object.keys(obj).map((key) => [key, obj[key]])
    );
    return map;
  }
}
