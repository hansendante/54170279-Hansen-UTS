import { Component, OnInit } from '@angular/core';
import { Makanan } from '../makanan';
import { DataService } from '../data.service';
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  makanan: Makanan[];
  notification = 8;//max order, bisa berubah
  error : boolean;
  displayKolom: string[] = ['namaMakanan', 'jenisMakanan', 'harga','durasiMasak','asalMakanan']; 

  constructor(private makan: DataService) { }

  ngOnInit(): void {
    this.makan.getMakanan().subscribe(
      response => {
        this.makanan = response as Makanan[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    )
  }

}
