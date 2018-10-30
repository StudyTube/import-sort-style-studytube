import { IStyleAPI, IStyleItem } from 'import-sort-style';

export default function(styleApi: IStyleAPI): Array<IStyleItem> {
  const {
    and,
    member,
    name,
    not,
    unicode,
  } = styleApi;

  const isAngularModule = (imported) => Boolean(imported.moduleName.match(/^@angular\//));

  const isLocalModule = (imported) => (
    [
      '@app',
      './',
      '../',
      '~/'
    ]
      .some((mask: string) => imported.moduleName.startsWith(mask))
  );

  const isConfig = (imported) => (
    [
      '@env',
      '/env',
      '/environment',
      '/config',
      '-routes',
      '/routes'
    ].some((mask: string) => imported.moduleName.endsWith(mask))
  );

  return [
    // import {...} "@angular/...";
    {
      match: isAngularModule,
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // third party and something not expected
    {
      match: and(not(isAngularModule), not(isLocalModule)),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // env, config, routes
    {
      match: and(isConfig, isLocalModule),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // local imports
    {
      match: isLocalModule,
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true }
  ];
}
