import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-predic',
  templateUrl: './predic.component.html',
  styleUrls: ['./predic.component.css']
})
export class PredicComponent implements OnInit {
  partidos = [
    {
      'anotaPrimero': '',
      'empate': false,
      'equipo1': '',
      'equipo2': '',
      'ganador': '',
      'marcador': '',
      'penales': false,
      'marcadorPenales': ''
    }
  ];
  constructor(private db: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      db.collection('participantes').doc(params['id']).ref.onSnapshot(function (doc) {
        this.partidos = doc.data().partidos;
      }.bind(this));
    });
  }

  ngOnInit() {
  }

}
