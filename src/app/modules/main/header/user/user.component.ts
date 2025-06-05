import {Component, OnInit} from '@angular/core';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor() {}

    ngOnInit(): void {
        this.user = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            metadata: {
                creationTime: '2022-01-01T00:00:00Z'
            }
        };
    }

    logout() {
        console.log('Logout action triggered');
    }

    formatDate(date) {
        return DateTime.fromRFC2822(date).toFormat('dd LLL yyyy');
    }
}
