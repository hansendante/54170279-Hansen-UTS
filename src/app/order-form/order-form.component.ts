import { Component, OnInit } from '@angular/core';
import { Makanan } from '../makanan';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  makanan: Makanan ={
    _id: '',
    namaMakanan: '',
    jenisMakanan: '',
    harga: null,
    durasiMasak: null,
    asalMakanan: ''  
  };
  id = null;
  error = false;
  update = true

  constructor(
    private _snackBar : MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  openSnackBar(message: string, action){
    this._snackBar.open(message,action,{
      duration : 1500
    });
  }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      //jika ada param id di url
      if(params.get('id')){
        this.id = params.get('id');

        this.ds.getMakan(this.id).subscribe(
          response => {
            this.makanan = response as Makanan;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }
  postMakan(){
    this.ds.postMakan(this.makanan).subscribe(response =>{
      // tampil notif
      this.openSnackBar("Orders Added", "Dismiss");
      this.router.navigate(['/first']);
    });
  }
  deleteMakan() {
    this.ds.deleteMakan(this.makanan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Orders Deleted", "Dismiss");
        this.router.navigate(['/first']);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateMakan() {
    this.ds.updateMakan(this.makanan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Orders Updated", "Dismiss")
        this.router.navigate(['/first']);
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
