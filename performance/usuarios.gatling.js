import { simulation, scenario, atOnceUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http.baseUrl("https://www.google.com");

  const scn = scenario("Test Base Minimalista").exec(
    http("Request Base").get("/"),
  );

  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
});
