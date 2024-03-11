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

interface Category {
  id: number;
  name: string;
  color: string;
}

const categories: Category[] = [
  { id: 1, name: "勉強会", color: "#FEA340" },
  { id: 2, name: "多文化共生イベント", color: "#4090FE" },
  { id: 3, name: "PodCasts", color: "#956ADF" },
  { id: 4, name: "季節イベント", color: "#FE408A" },
  { id: 5, name: "交流会", color: "#64D753" },
  { id: 6, name: "スポーツ", color: "#6362DD" },
];

const TableHeader: React.FC = () => (
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
);

const TableRow: React.FC<{ category: Category }> = ({ category }) => {
  const iconStyle = {
    marginRight: "15px",
  };

  return (
    <Tr>
      <Td>{category.id}</Td>
      <Td>{category.name}</Td>
      <Td>{category.color}</Td>
      <Td>
        {category.id === 1 && (
          <Flex>
            <FontAwesomeIcon
              icon={faPenToSquare}
              color="#F6921E"
              fontSize={30}
              style={iconStyle}
            />
            <FontAwesomeIcon icon={faTrash} color="#FF5454" fontSize={30} />
          </Flex>
        )}
      </Td>
    </Tr>
  );
};

export default function Index() {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="orange">
        <TableHeader />
        <Tbody>
          {categories.map((category) => (
            <TableRow key={category.id} category={category} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
