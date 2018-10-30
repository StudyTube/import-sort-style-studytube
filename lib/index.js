"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi) {
    const { and, member, name, not, unicode, } = styleApi;
    const isAngularModule = (imported) => Boolean(imported.moduleName.match(/^@angular\//));
    const isLocalModule = (imported) => ([
        '@app',
        './',
        '../',
        '~/'
    ]
        .some((mask) => imported.moduleName.startsWith(mask)));
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
exports.default = default_1;
