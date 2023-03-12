import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSortModule  } from '@angular/material/sort';
import {MatSort,Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'app/api.service';
import { OpenDialogComponent } from 'app/dialog/open-dialog/open-dialog.component';

export interface usuario {
  id: string;
  nombre: string;
  correo: string;
  estado: string;
}


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  dataSource: any;
  selectedRowIndex:any;
  cancela: boolean = false;
  selection = new SelectionModel(false, []);
  displayedColumns = ['nombres', 'email', 'estado'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  constructor(public dialog: MatDialog,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.renderDataTable();
  }



  selected(row) {
    this.selectedRowIndex=row;
    console.log('selectedRow',row)
  }

  editar(){
    console.log(this.selectedRowIndex);
  }

  renderDataTable() {
    this.api.getUsuarios().subscribe(x => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = x;
      this.empTbSort.disableClear = true;
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('Error de conexion de datatable!' + error);
      });
  }

  openDialogEdit(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OpenDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
      animal:'testtt',
      usuario:this.selectedRowIndex
      },
    });
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OpenDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        animal: 'unicorn',
        usuario:this.selectedRowIndex
      },
    });
  }

  clickedRows = new Set<usuario>();

}
