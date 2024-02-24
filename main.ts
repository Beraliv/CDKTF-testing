import { App, RemoteBackend } from "cdktf";
import { LocalDockerStack } from "./src/LocalDockerStack";
import { RemoteAwsStack } from "./src/RemoteAwsStack";

type Mode = "local" | "remote-aws";

const isNever = Math.random() !== 1;

const MODE: Mode = isNever ? "remote-aws" : "local";

const app = new App();
if (MODE === "local") {
  new LocalDockerStack(app, "cdktf-testing");
} else if (MODE === "remote-aws") {
  const remoteAwsStack = new RemoteAwsStack(app, "cdktf-testing");

  new RemoteBackend(remoteAwsStack, {
    hostname: "app.terraform.io",
    organization: "beraliv_dev",
    workspaces: {
      name: "cdktf-testing",
    },
  });
}
app.synth();
