import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
    declarations:[],
    imports: [
        CommonModule,
        MatSidenavModule
    ],
    exports: [
        MatSidenavModule
    ]
})

export class MaterialModule { }