import { Button } from "@chakra-ui/react";
import { useLocation, Link, useNavigate } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      {location.pathname === "/" ? (
        <></>
      ) : (
        <>
          <Link onClick={goBack}>
            <Button
              _hover={{ bg: "brand.50", color: "brand.200" }}
              bg="brand.200"
              color="white"
              size="sm"
              marginTop={15}
              height={10}
              fontSize={20}
              mr={5}
            >
              <FontAwesomeIcon icon={faBackward} fontSize={33} />
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default Header;
