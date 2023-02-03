import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

}
