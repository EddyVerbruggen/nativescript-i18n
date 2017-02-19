import { Component, OnInit } from "@angular/core";

@Component({
    selector: "main",
    templateUrl: "./main-page.html",
})
export class MainPageComponent implements OnInit {
    message: String;
    modelReplacement: String;
    ngOnInit() {
        this.message = global.L('hello_replace', 'from component');
        this.modelReplacement = 'COMPONENT REPLACEMENT';
    
    }
}
