export class AnalyticsService {
  data: any;
  constructor() {
    this.data = {
      visitors: [], // deve ser um array vazio para receber os visitantes
      totalTimeOnSite: 0, // deve ser "totalTimeOnSite" em vez de "timeOnSite"
      pagesVisited: {},
      trafficSources: {},
      conversions: 0,
    };
  }

  recordVisit(): void {
    this.data.visitors.push({}); // deve ser um objeto vazio para representar o visitante
  }

  recordTimeOnSite(time: any): void {
    this.data.totalTimeOnSite += time;
  }

  recordPageVisit(page: string | number): void {
    if (!this.data.pagesVisited[page]) {
      this.data.pagesVisited[page] = 0;
    }
    this.data.pagesVisited[page] += 1;
  }

  recordTrafficSource(source: string | number): void {
    if (!this.data.trafficSources[source]) {
      this.data.trafficSources[source] = 0;
    }
    this.data.trafficSources[source] += 1;
  }

  recordConversion(): void {
    this.data.conversions += 1;
  }

  generateReport(): void {
    const data = this.getData(); // Obter os dados coletados pelo serviço
    const report = {
      totalVisitors: 0,
      averageTimeOnSite: 0, // inicializar com valor 0
      mostVisitedPage: "", // inicializar com valor vazio
    };

    // Calcular as estatísticas para o relatório
    report.totalVisitors = data.visitors.length;
    report.averageTimeOnSite = data.totalTimeOnSite / report.totalVisitors || 0; // fazer divisão apenas se houver visitantes
    report.mostVisitedPage = this.getMostVisitedPage(data.pagesVisited);

    // Enviar o relatório por email para o administrador do website
    this.emailReport(report);
  }

  emailReport(report: {
    totalVisitors: number;
    averageTimeOnSite: number;
    mostVisitedPage: string;
  }): void {
    // enviar o relatório por email
    console.log("Enviando relatório por email:", report);
  }

  getData(): any {
    return this.data;
  }

  getMostVisitedPage(pagesVisited: any): string {
    // Obter a página mais visitada com base nos dados de visitas
    // ...
    return Object.keys(pagesVisited)[0] || ""; // retornar a primeira página ou vazio se não houver visitas
  }
}
