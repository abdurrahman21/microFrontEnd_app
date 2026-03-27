import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => loadRemoteModule({
            type: 'module',
            remoteEntry: 'https://abdurrahman21.github.io/microFrontEnd_app/dashboard/remoteEntry.js',
            exposedModule: './Component'
        }).then(m => m.App)
    }
];


