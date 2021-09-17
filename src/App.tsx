import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import _ from "lodash";

const categoryList = [
  "精美點心",
  "即拉腸粉",
  "自製包點",
  "煎炸點心",
  "甜美糕點",
  "田園蔬菜",
  "皇牌蒸飯",
  "粥類",
  "飲品",
  "其他",
];
const itemList = [
  {
    id: 24,
    name: "（蒸）上海菜肉包",
    price: 7,
    catId: 3,
    shortForm: "蒸 菜肉",
  },
  {
    id: 25,
    name: "（煎）上海菜肉包",
    price: 7,
    catId: 3,
    shortForm: "煎 菜肉",
  },
  { id: 80, name: "1蚊", price: 1, catId: 10, shortForm: "1蚊" },
  { id: 1, name: "隨心蝦餃皇", price: 27, catId: 1, shortForm: "蝦餃皇" },
  { id: 2, name: "韭菜鮮蝦餃", price: 22, catId: 1, shortForm: "韭菜餃" },
  { id: 4, name: "蟹柳滑雞扎", price: 20, catId: 1, shortForm: "雞扎" },
  { id: 5, name: "鵪鶉蛋燒賣", price: 20, catId: 1, shortForm: "鵪鶉蛋" },
  { id: 6, name: "蟹籽燒賣皇", price: 20, catId: 1, shortForm: "燒賣" },
  { id: 7, name: "牛肉燒賣皇", price: 18, catId: 1, shortForm: "牛肉燒賣" },
  { id: 8, name: "蠔油鮮竹卷", price: 19, catId: 1, shortForm: "鮮竹卷" },
  { id: 9, name: "醬皇蒸鳳爪", price: 19, catId: 1, shortForm: "鳳爪" },
  { id: 10, name: "足料糯米雞", price: 25, catId: 1, shortForm: "糯米雞" },
  { id: 11, name: "排骨白腸粉", price: 35, catId: 1, shortForm: "排骨腸粉" },
  { id: 12, name: "豉汁蒸排骨", price: 19, catId: 1, shortForm: "排骨" },
  { id: 13, name: "鮮竹牛肉球", price: 19, catId: 1, shortForm: "牛肉球" },
  {
    id: 14,
    name: "招牌珍珠雞 (一隻)",
    price: 10,
    catId: 1,
    shortForm: "珍珠 一隻",
  },
  {
    id: 15,
    name: "招牌珍珠雞 (兩隻)",
    price: 18,
    catId: 1,
    shortForm: "珍珠 兩隻",
  },
  {
    id: 16,
    name: "招牌珍珠雞 (三隻)",
    price: 25,
    catId: 1,
    shortForm: "珍珠 三隻",
  },
  { id: 17, name: "隨心鮮蝦腸", price: 28, catId: 2, shortForm: "蝦腸" },
  { id: 64, name: "蜜汁叉燒腸", price: 24, catId: 2, shortForm: "叉燒腸" },
  { id: 62, name: "香茜牛肉腸", price: 24, catId: 2, shortForm: "牛肉腸" },
  { id: 20, name: "竹笙羅漢齋腸", price: 24, catId: 2, shortForm: "羅漢齋腸" },
  { id: 21, name: "脆皮春卷腸", price: 24, catId: 2, shortForm: "春卷腸" },
  { id: 22, name: "葱花蝦米腸", price: 24, catId: 2, shortForm: "蝦米腸" },
  { id: 23, name: "混醬布拉腸", price: 20, catId: 2, shortForm: "布拉腸" },
  { id: 26, name: "蜜汁叉燒包", price: 7, catId: 3, shortForm: "叉燒" },
  { id: 27, name: "鬆軟馬拉糕", price: 7, catId: 3, shortForm: "馬拉" },
  { id: 28, name: "鳳凰奶皇包", price: 7, catId: 3, shortForm: "奶皇" },
  { id: 29, name: "黑芝麻蓉包", price: 7, catId: 3, shortForm: "芝麻" },
  { id: 30, name: "家鄉糯米卷", price: 7, catId: 3, shortForm: "糯米卷" },
  { id: 31, name: "北方白饅頭", price: 6, catId: 3, shortForm: "饅頭" },
  { id: 32, name: "鮮蝦春卷", price: 18, catId: 4, shortForm: "春卷" },
  { id: 33, name: "鮮蝦腐皮卷", price: 18, catId: 4, shortForm: "腐皮卷" },
  { id: 34, name: "香煎蘿蔔糕", price: 18, catId: 4, shortForm: "蘿蔔糕" },
  { id: 35, name: "脆炸雲吞", price: 16, catId: 4, shortForm: "雲吞" },
  { id: 36, name: "蓮蓉煎堆仔", price: 16, catId: 4, shortForm: "煎堆" },
  { id: 37, name: "咸水角", price: 18, catId: 4, shortForm: "咸水" },
  {
    id: 38,
    name: "養顏姜汁糕(三件)",
    price: 12,
    catId: 5,
    shortForm: "姜汁糕",
  },
  {
    id: 39,
    name: "滋潤紅枣糕(三件)",
    price: 12,
    catId: 5,
    shortForm: "紅枣糕",
  },
  { id: 40, name: "白灼菜芯", price: 18, catId: 6, shortForm: "菜芯" },
  { id: 41, name: "田園唐生菜", price: 18, catId: 6, shortForm: "生菜" },
  { id: 42, name: "鳳爪排骨飯", price: 29, catId: 7, shortForm: "鳳爪排骨" },
  { id: 44, name: "北菇滑雞飯", price: 29, catId: 7, shortForm: "北菇雞" },
  { id: 45, name: "臘腸滑雞飯", price: 29, catId: 7, shortForm: "臘腸雞" },
  { id: 46, name: "(蒸)蛋牛肉飯", price: 29, catId: 7, shortForm: "蒸 蛋牛" },
  { id: 47, name: "(煎)蛋牛肉飯", price: 29, catId: 7, shortForm: "煎 蛋牛" },
  { id: 48, name: "竹笙羅漢齋飯", price: 29, catId: 7, shortForm: "羅漢齋" },
  { id: 49, name: "南瓜排骨飯", price: 29, catId: 7, shortForm: "南瓜" },
  {
    id: 50,
    name: "荷葉蟲草花蒸滑雞飯",
    price: 42,
    catId: 7,
    shortForm: "蟲草雞",
  },
  {
    id: 51,
    name: "荷葉蟲草花蒸排骨飯",
    price: 42,
    catId: 7,
    shortForm: "蟲草排骨",
  },
  { id: 52, name: "皮蛋瘦肉粥", price: 16, catId: 8, shortForm: "皮蛋瘦" },
  { id: 53, name: "粟米南瓜粥", price: 16, catId: 8, shortForm: "南瓜" },
  { id: 54, name: "軟綿綿白粥", price: 16, catId: 8, shortForm: "白粥" },
  { id: 55, name: "汽水", price: 8, catId: 9, shortForm: "汽水" },
  { id: 43, name: "土魷肉餅飯", price: 29, catId: 7, shortForm: "肉餅" },
  { id: 3, name: "北菇綿花雞", price: 22, catId: 1, shortForm: "北菇雞" },
  { id: 81, name: "肉骨茶", price: 17, catId: 11, shortForm: "肉骨茶" },
];

const ReceiptPage = ({ result }: { result: any[] }) => {
  const detailedSelectedList = result.map((e) =>
    itemList.find((item) => item.id == e)
  );
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Text style={{ fontSize: 30, textAlign: "center" }}>
                單號
              </Card.Text>
              {result.length > 0 && <Card.Title style={{ textAlign: "center", fontSize: 50 }}>
                001
              </Card.Title>}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title style={{ fontSize: 30, textAlign: "center" }}>
                訂單詳細
              </Card.Title>
              {detailedSelectedList.map(
                (e) =>
                  e && (
                    <Card.Text style={{ margin: "10px 0", fontSize: 20 }}>
                      <Container>
                        <Row>
                          <Col xs={5}>{e.name || ""}</Col>
                          <Col>x 1</Col>
                          <Col>${e?.price || ""}</Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  )
              )}
              <Card.Text style={{ margin: "10px 0", fontSize: 20 }}>
                <Container>
                  <Row>
                    <Col style={{ fontWeight: "bold" }} xs={5}>
                      總計
                    </Col>
                    <Col />
                    <Col style={{ fontWeight: "bold" }}>
                      $
                      {_.sum(
                        result.map(
                          (e) => itemList.find((item) => item.name == e)?.id
                        )
                      ) || 0}
                    </Col>
                  </Row>
                </Container>
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
function App() {
  const [isScan, setisScan] = useState(false);
  const [data, setData] = useState<number[]>([]);
  return isScan ? (
    <QrReader
      delay={500}
      onError={(err) => alert(err)}
      onScan={(data: string | null) => {
        if (data) {
          setData(data?.split(",").map(Number));
          setisScan(false);
        }
      }}
      style={{ width: "100%" }}
    />
  ) : (
    <>
      <Button
        onClick={() => setisScan(true)}
        variant="warning"
        style={{ width: "100%" }}
      >
        Scan
      </Button>
      <ReceiptPage result={data} />
      <Button
        style={{ width: "100%", position: "absolute", bottom: 0, height: 150 }}
        onClick={() => {
          setData([]);
          alert("完成收款");
        }}
      >
        收錢
      </Button>
    </>
  );
}

export default App;
