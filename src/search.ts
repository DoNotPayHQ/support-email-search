import fs from "fs";

let founds = [];
let processedItems: any = {};
let test: any = {
  "joshua": {
    count: 0,
  },
  "unable to issue a refund || cannot issue a refund || cannot refund": {
    count: 0,
  },
  "refund || money back || return money || fraudulent charges || scam || fraud || reimburse || return funds || pay back || return payment || repayment || stolen": {
    count: 0,
  },
  "cancel || cancellation || terminate || stop charging || close account || close my account || delete my account || delete account || unsubscribe || deactivate my membership || cease subscription || end services || quit your program || stop my subscription || revoke my membership || withdraw from your service || discontinue my account || nullify membership || annul my account || break off my subscription || suspend my account || invalidate my membership || eliminate my subscription || rescind my subscription || remove my profile || extinguish my membership || i want out || dissolve my account || no longer require your service || finish my membership || i wish to leave || unregister my account || end my association || shut down my subscription || cut off my membership || repeal my account || exit the subscription || opt-out of your service || abandon my account || i'd like to depart || withdraw my participation || unenroll from this service || i'm done with your service || turn off my account || expire my membership || disengage from your services || let me go || i'm out || can't continue anymore || halt my services || renounce my membership || retire from your services || please let me off || withdraw my enrollment": {
    count: 0,
  },
  "deleted your account || deleting your account || closed your account || closing your account || canceled your subscription || cancelled your subscription || canceling your subscription || cancelling your subscription || canceled your account || cancelled your account || canceling your account || cancelling your account || closed and refunded one account": {
    count: 0,
  },
  "will typically appear sooner than that in your account": {
    count: 0,
  },
  "initiated in the past two weeks may still appear": {
    count: 0,
  },
};
let total = 0;
let tots = 0
function readAndLoopJsonFile(filePath: string): void {
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });

  let buffer = "";
  stream.on("data", (data) => {
    buffer += data;
    console.log('1')
    const items = buffer.split("\n");
    // Process each item except the last one (incomplete)
    for (let i = 0; i < items.length - 1; i++) {
      tots++;
      try {
        const item = JSON.parse(items[i]);
        if (processedItems[item.id]) {
          continue;
        }

        processedItems[item.id] = true;
        const ca = new Date(item.created_at);
        // const ne = new Date("2020-06-01T00:00:00.000Z");

        // Perform your desired operations with each item
        if (item.comments.length > 0) {
          total++;

          const items = [
            "refund",
            "money back",
            "return money",
            "fraudulent charges",
            "scam",
            "fraud",
            "reimburse",
            "return funds",
            "pay back",
            "return payment",
            "repayment",
            "stolen"
          ];
          const st = `refund || money back || return money || fraudulent charges || scam || fraud || reimburse || return funds || pay back || return payment || repayment || stolen`
          const fx = item.comments.filter((c: any) => {
            if (
              c.via.channel === "email" &&
              items
                .map((i) => c.plain_body.toLowerCase().includes(i))
                .includes(true)
            ) {
              return true;
            }
            return false;
          });
          if (fx.length > 0) {
            test[st].count++;
            if (test[st][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]) {
              test[st][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]++;
            } else {
              test[st][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`] = 1;
            }
          }


          const itemsx = [
            "cancel",
            "cancellation",
            "terminate",
            "stop charging",
            "close account",
            "close my account",
            "delete my account",
            "delete account",
            "unsubscribe",
            "deactivate my membership",
            "cease subscription",
            "end services",
            "quit your program",
            "stop my subscription",
            "revoke my membership",
            "withdraw from your service",
            "discontinue my account",
            "nullify membership",
            "annul my account",
            "break off my subscription",
            "suspend my account",
            "invalidate my membership",
            "eliminate my subscription",
            "rescind my subscription",
            "remove my profile",
            "extinguish my membership",
            "i want out",
            "dissolve my account",
            "no longer require your service",
            "finish my membership",
            "i wish to leave",
            "unregister my account",
            "end my association",
            "shut down my subscription",
            "cut off my membership",
            "repeal my account",
            "exit the subscription",
            "opt-out of your service",
            "abandon my account",
            "i'd like to depart",
            "withdraw my participation",
            "unenroll from this service",
            "i'm done with your service",
            "turn off my account",
            "expire my membership",
            "disengage from your services",
            "let me go",
            "i'm out",
            "can't continue anymore",
            "halt my services",
            "renounce my membership",
            "retire from your services",
            "please let me off",
            "withdraw my enrollment",
          ];
          const stx = `cancel || cancellation || terminate || stop charging || close account || close my account || delete my account || delete account || unsubscribe || deactivate my membership || cease subscription || end services || quit your program || stop my subscription || revoke my membership || withdraw from your service || discontinue my account || nullify membership || annul my account || break off my subscription || suspend my account || invalidate my membership || eliminate my subscription || rescind my subscription || remove my profile || extinguish my membership || i want out || dissolve my account || no longer require your service || finish my membership || i wish to leave || unregister my account || end my association || shut down my subscription || cut off my membership || repeal my account || exit the subscription || opt-out of your service || abandon my account || i'd like to depart || withdraw my participation || unenroll from this service || i'm done with your service || turn off my account || expire my membership || disengage from your services || let me go || i'm out || can't continue anymore || halt my services || renounce my membership || retire from your services || please let me off || withdraw my enrollment`
          const fxxaa = item.comments.filter((c: any) => {
            if (
              c.via.channel === "email" &&
              itemsx
                .map((i) => c.plain_body.toLowerCase().includes(i))
                .includes(true)
            ) {
              return true;
            }
            return false;
          });
          if (fxxaa.length > 0) {
            test[stx].count++;
            if (test[stx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]) {
              test[stx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]++;
            } else {
              test[stx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`] = 1;
            }
          }



          const itemsxx = [
            "deleted your account",
            "deleting your account",
            "closed your account",
            "closing your account",
            "canceled your subscription",
            "cancelled your subscription",
            "canceling your subscription",
            "cancelling your subscription",
            "canceled your account",
            "cancelled your account",
            "canceling your account",
            "cancelling your account",
            "closed and refunded one account",
          ];
          const stxx = `deleted your account || deleting your account || closed your account || closing your account || canceled your subscription || cancelled your subscription || canceling your subscription || cancelling your subscription || canceled your account || cancelled your account || canceling your account || cancelling your account || closed and refunded one account`
          const fxxaax = item.comments.filter((c: any) => {
            if (
              c.via.channel === "web" &&
              itemsxx
                .map((i) => c.plain_body.toLowerCase().includes(i))
                .includes(true)
            ) {
              return true;
            }
            return false;
          });
          if (fxxaax.length > 0) {
            test[stxx].count++;
            if (test[stxx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]) {
              test[stxx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]++;
            } else {
              test[stxx][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`] = 1;
            }
          }

          const itemsxx1 = [
            "unable to issue a refund",
            "cannot issue a refund",
            "cannot refund",
          ];
          const stxx1 = `unable to issue a refund || cannot issue a refund || cannot refund`
          const fxxaax1 = item.comments.filter((c: any) => {
            if (
              c.via.channel === "web" &&
              itemsxx1
                .map((i) => c.plain_body.toLowerCase().includes(i))
                .includes(true)
            ) {
              return true;
            }
            return false;
          });
          if (fxxaax1.length > 0) {
            test[stxx1].count++;
            if (test[stxx1][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]) {
              test[stxx1][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]++;
            } else {
              test[stxx1][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`] = 1;
            }
          }


          const f = item.comments.filter((c: any) => {
            if (
              c.via.channel === "web" &&
              c.plain_body.toLowerCase().includes("unable to issue a")
            ) {
              return true;
            }
            return false;
          });
          if (f.length > 0) {
            test["unable to issue a"].count++;
            if (
              test["unable to issue a"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]
            ) {
              test["unable to issue a"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]++;
            } else {
              test["unable to issue a"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ] = 1;
            }
          }

          const fxx = item.comments.filter((c:any) => {
            if (
              c.via.channel === "web" &&
              c.plain_body
                .toLowerCase()
                .includes("initiated in the past two weeks may still appear")
            ) {
              return true;
            }
            return false;
          });
          if (fxx.length > 0) {
            test["initiated in the past two weeks may still appear"].count++;
            if (
              test["initiated in the past two weeks may still appear"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]
            ) {
              test["initiated in the past two weeks may still appear"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]++;
            } else {
              test["initiated in the past two weeks may still appear"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ] = 1;
            }
          }

          const fxxx = item.comments.filter((c: any) => {
            if (
              c.via.channel === "web" &&
              c.plain_body
                .toLowerCase()
                .includes(
                  "will typically appear sooner than that in your account"
                )
            ) {
              return true;
            }
            return false;
          });
          if (fxxx.length > 0) {
            test["will typically appear sooner than that in your account"]
              .count++;
            if (
              test["will typically appear sooner than that in your account"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]
            ) {
              test["will typically appear sooner than that in your account"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ]++;
            } else {
              test["will typically appear sooner than that in your account"][
                `${ca.getUTCMonth() + 1}-${ca.getFullYear()}`
              ] = 1;
            }
          }

          const itemsxy1 = [
            "please please please cancel",
          ];
          const stx2 = `please please please cancel`
          const fxxaa2 = item.comments.filter((c: any) => {
            if (
              c.via.channel === "email" &&
              itemsxy1
                .map((i) => c.plain_body.toLowerCase().includes(i))
                .includes(true)
            ) {
              return true;
            }
            return false;
          });
          if (fxxaa2.length > 0) {
            test[stx2].count++;
            if (test[stx2][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]) {
              test[stx2][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`]++;
            } else {
              test[stx2][`${ca.getUTCMonth() + 1}-${ca.getFullYear()}`] = 1;
            }
          }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }

    buffer = items[items.length - 1];
  });

  stream.on("end", () => {
    console.log('tots')
    // fs.writeFileSync('ks.json', JSON.stringify(founds));

    console.log("end", founds.length);
    // console.log('end', processedItems)
    console.log("end", total);
    fs.writeFileSync("ks.json", JSON.stringify(test));
    // if (buffer.trim() !== "") {
    //   try {
    //     const item = JSON.parse(buffer);
    //     // Perform your desired operations with the last item
    //     if (item.comments.length > 0) {
    //       const f = item.comments.filter((c) => {
    //         if (c.plain_body.toLowerCase().includes("refund")) {
    //           return true;
    //         }
    //         return false;
    //       });
    //       if (f.length > 0) {
    //         founds.push(item);
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error parsing JSON:", error);
    //   }
    // }
  });

  stream.on("error", (error) => {
    console.error("Error reading JSON file:", error);
  });
}

readAndLoopJsonFile("./emails2023.txt");

