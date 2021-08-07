import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    mode: String = "";
    screenWidth: number | undefined = undefined;

    updateSidenavMode() {
        let condition = this.isResponsive();
        if (condition) {
            this.mode = 'over';
        } else {
            this.mode = 'side';
        }
    }

    isResponsive(): boolean {
        return <boolean>(this.screenWidth && this.screenWidth < 960);
    }

}
