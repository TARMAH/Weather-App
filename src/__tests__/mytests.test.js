import { csvToJSON } from '../components/utils/csvToJson';
import { shallow  } from 'enzyme';
import { WeatherDetails } from '../components/WeatherDetails/WeatherDetails';
import { Map } from '../components/Map/Map';


test('csvToJSON function test', () => {
  return (csvToJSON('"name"\n"Köln"').then(data => {
          expect(data).toStrictEqual({"headers": ["name"], "result": [{"name": "Koln"}]});
      }));
});

describe('Component: WeatherDetails', () => {
  const Props = {
    cityName: 'A',
    weatherInfo: { air_temperature: 10 },
    units:{ air_temperature: 'm/s' }
  };  

  it('renders the WeatherDetails with the given props', () => {
    const wrapper = shallow(
      <WeatherDetails {...Props}/>
    );
    const title = wrapper.find('.title');
    const temp = wrapper.find('.temp');
    expect(title.text()).toStrictEqual('A');
    expect(temp.text()).toStrictEqual(Props.weatherInfo.air_temperature + " " + Props.units.air_temperature);
  });
});


describe("Test Map", () => {
  test("check if Map loaded correctly", () => {
    const coordinates = { lat: 50, lng: 100 };
    const map = shallow(<Map coordinates={coordinates} />);
    expect(map.find('.map-container').length).toBe(1);
  });
});
