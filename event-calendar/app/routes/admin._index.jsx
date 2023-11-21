import { Link } from "@remix-run/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const iconStyle = {
    marginRight: "15px",
  };

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="orange">
        <Thead>
          <Tr>
            <Th
              backgroundColor="#FFEFD7"
              color="#FFB803"
              colSpan={2}
              textAlign="center"
            >
              Category
            </Th>
            <Th backgroundColor="#FFB803" color="#fff" textAlign="center">
              Title
            </Th>
            <Th backgroundColor="#FFB803" color="#fff" textAlign="center">
              Event
            </Th>
          </Tr>
          <Tr>
            <Th backgroundColor="#DADADA">Id</Th>
            <Th backgroundColor="#DADADA">name</Th>
            <Th backgroundColor="#DADADA">color</Th>
            <Th backgroundColor="#DADADA">operation</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>勉強会</Td>
            <Td>#FEA340</Td>
            <Td>
              <Flex>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="#F6921E"
                  fontSize={30}
                  style={iconStyle}
                />
                <FontAwesomeIcon icon={faTrash} color="#FF5454" fontSize={30} />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>多文化共生イベント</Td>
            <Td>#4090FE</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>PodCasts</Td>
            <Td>#956ADF</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td>季節イベント</Td>
            <Td>#FE408A</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td>交流会</Td>
            <Td>#64D753</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>6</Td>
            <Td>スポーツ</Td>
            <Td>#6362DD</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
