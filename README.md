# import-sort-style-studytube
Studytube's import-sort style (Angular, Typescript)

for [import-sort](https://github.com/renke/import-sort)

```javascript
// angular imports:
import {...} "@angular/...";

// third party modules:
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { TranslateModule } from '@ngx-translate/core';
import 'moment/locale/en.js';

// env, config, routes:
import { APP_TOKEN } from './config';
import { appRoutes } from './routes';
import { environment } from '@env';

// local imports:
import { AnotherComponent } from '../another/another.component';
import { SomePipe } from '@app/shared/pipes/some.pipe';
import { SomeComponent } from './components/some/some.component';
import './my-lib.js';
```

## install from npm

1. `npm i import-sort-style-studytube -D`

2. Add `.importsortrc` file to the project:

```javascript
{
  ".ts, .tsx": {
    "parser": "typescript",
    "style": "studytube"
  }
}
```

