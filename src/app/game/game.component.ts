import { Component, OnInit , Input } from '@angular/core';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() time;
  public resultado;
  public pregunta = ''

  public categorias = []
  public animales = []

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.TopSearchFunction();
  }

  TopSearchFunction() {
    this.rest.soapAnimals().then ((res) => {
      var json = JSON.stringify(this.xmlToJson(res))
      console.log(json)
      var aux = json.split('"a:NombreAnimal":').splice(1)
      for (var i of aux) {
        var auxI = i.split('"a:NombreCategoria"')
        this.animales.push(auxI[0])
        this.categorias.push[auxI[1]]    
      }
      console.log(this.animales)
      console.log(this.categorias)
   })
  };

  xmlToJson(xml) {
    var obj = {};
    if (4 === xml.nodeType) {
        obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var TEXT_NODE_TYPE_NAME = '#text',
                item = xml.childNodes.item(i),
                nodeName = item.nodeName,
                content;

            if (TEXT_NODE_TYPE_NAME === nodeName) {
                if ((null === xml.nextSibling) || (xml.localName !== xml.nextSibling.localName)) {
                    content = xml.textContent;
                } else if (xml.localName === xml.nextSibling.localName) {
                    content = (xml.parentElement.childNodes[0] === xml) ? [xml.textContent] : xml.textContent;
                }
                return content;
            } else {
                if ('undefined' === typeof(obj[nodeName])) {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if ('undefined' === typeof(obj[nodeName].length)) {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
    }
    return obj;
}


}
