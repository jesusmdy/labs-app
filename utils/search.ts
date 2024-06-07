export function stringIncludes(search: string, context: string) {
  return (
    String(context).toLowerCase().indexOf(String(search).toLowerCase()) != -1
  );
}
