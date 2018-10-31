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
      '@env',
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


    // third party modules
    // e.g.:
    //
    //    import { NgxPageScrollModule } from 'ngx-page-scroll';
    {
      match: and(not(isAngularModule), not(isLocalModule)),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },


    // env, config, routes
    // e.g.:
    //
    //    import { appRoutes } from './routes';
    //    import { APP_TOKEN } from './config';
    //    import { environment } from '@env';
    {
      match: and(isConfig, isLocalModule),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },


    // local imports
    // e.g.:
    //
    //    import { AnotherComponent } from '../another/another.component';
    //    import { SomePipe } from '@app/shared/pipes/some.pipe';
    //    import { SomeComponent } from './components/some/some.component';
    {
      match: and (isLocalModule, not(isConfig)),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true }
  ];
}
