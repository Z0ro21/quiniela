import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
  participantes = [];
  constructor(private db: AngularFirestore) {
    // this.insertarParticipante();
    db.collection('participantes').ref.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const data = {
          id: doc.id,
          nombre: doc.data().nombre,
          partidos: doc.data().partidos,
          puntos: doc.data().puntos
        };
        this.participantes.push(data);
        db.collection('mundial').doc('resultados').ref.onSnapshot(function (doc2) {
          this.partidos = doc2.data().partidos;
          this.calcularPuntaje();
          this.ordenarPaticipantes();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  ngOnInit() {
  }
  ordenarPaticipantes() {
    this.participantes.sort(function (a, b) {
      return (b.puntos - a.puntos);
    });
  }
  calcularPuntaje() {
    this.participantes.forEach(participante => {
      participante.puntos = 0;
      participante.partidos.forEach(function (partido, index) {
        if (partido.equipo1 === this.partidos[index].equipo1 && partido.equipo2 === this.partidos[index].equipo2) {
          if (partido.marcador === this.partidos[index].marcador) {
            participante.puntos += 2;
          }
          if (partido.ganador === this.partidos[index].ganador) {
            participante.puntos += 1;
          }
          if (partido.anotaPrimero === this.partidos[index].anotaPrimero) {
            participante.puntos += 1;
          }
          if (partido.penales) {
            if (partido.marcadorPenales === this.partidos[index].marcadorPenales) {
              participante.puntos += 2;
            }
          }
        }
      }.bind(this));
    });
  }
  insertarParticipante() {
    this.db.collection('participantes').add({
      nombre: 'Adrian Paredes',
      partidos : [
        {
          'anotaPrimero': 'Francia',
          'empate': false,
          'equipo1': 'Uruguay',
          'equipo2': 'Francia',
          'ganador': 'Francia',
          'marcador': '2-3',
          'penales': false
        },
        {
          'anotaPrimero': 'Belgica',
          'empate': false,
          'equipo1': 'Brasil',
          'equipo2': 'Belgica',
          'ganador': 'Brasil',
          'marcador': '1-2',
          'marcadorPenales': '5-4',
          'penales': false
        },
        {
          'anotaPrimero': 'Inglaterra',
          'empate': false,
          'equipo1': 'Suecia',
          'equipo2': 'Inglaterra',
          'ganador': 'Inglaterra',
          'marcador': '1-2',
          'penales': false
        },
        {
          'anotaPrimero': 'Croacia',
          'empate': true,
          'equipo1': 'Rusia',
          'equipo2': 'Croacia',
          'ganador': 'Croacia',
          'marcador': '1-1',
          'penales': true,
          'marcadorPenales': '3-4'
        },
        {
          'anotaPrimero': 'Brasil',
          'empate': false,
          'equipo1': 'Francia',
          'equipo2': 'Brasil',
          'ganador': 'Francia',
          'marcador': '2-1',
          'penales': false
        },
        {
          'anotaPrimero': 'Inglaterra',
          'empate': false,
          'equipo1': 'Croacia',
          'equipo2': 'Inglaterra',
          'ganador': 'Inglaterra',
          'marcador': '1-2',
          'penales': false
        },
        {
          'anotaPrimero': 'Brasil',
          'empate': false,
          'equipo1': 'Brasil',
          'equipo2': 'Croacia',
          'ganador': 'Brasil',
          'marcador': '2-1',
          'penales': false
        },
        {
          'anotaPrimero': 'Francia',
          'empate': false,
          'equipo1': 'Francia',
          'equipo2': 'Inglaterra',
          'ganador': 'Francia',
          'marcador': '2-1',
          'penales': false
        }
      ],
      puntos: 0
    }
    );
  }
}
