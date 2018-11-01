"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi, baseFile) {
    const { and, member, name, not, unicode, isInstalledModule, } = styleApi;
    const isAngularModule = (imported) => Boolean(imported.moduleName.match(/^@angular\//));
    const isConfig = (imported) => ([
        '@env',
        '/env',
        '/environment',
        '/config',
        '-routes',
        '/routes'
    ].some((mask) => imported.moduleName.endsWith(mask)));
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
            match: and(not(isAngularModule), isInstalledModule(baseFile)),
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
            match: and(isConfig, not(isInstalledModule(baseFile))),
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
            match: and(not(isConfig), not(isInstalledModule(baseFile))),
            sort: member(unicode),
            sortNamedMembers: name(unicode),
        },
        { separator: true }
    ];
}
exports.default = default_1;
