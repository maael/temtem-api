import Jumbrotron from '@maael/jumbotron-component';
import ApiBlock from '@maael/api-block-component';
import ApiHeader from '@maael/api-header-component';
import ApiParamBlock from '@maael/api-param-block-component';
import * as examples from '../util/examples';

export default () => (
  <>
    <style jsx global>{`
      html, body {
        padding: 0;
        margin: 0;
      }
    `}</style>
    <Jumbrotron>
      <div>Temtem API</div>
    </Jumbrotron>
    <ApiBlock example={examples.knownTemtemExample}>
      <>
        <ApiHeader path='/api/known-temtems' />
        <ApiParamBlock params={[
          {name: 'names', required: false, description: ''},
          {name: 'fields', required: false, description: ''},
          {name: 'expand', required: false, description: ''}
        ]} />
      </>
    </ApiBlock>
    <ApiBlock example={examples.typeExample}>
      <ApiHeader path='/api/types' />
    </ApiBlock>
    <ApiBlock example={examples.conditionExample}>
      <ApiHeader path='/api/conditions' />
    </ApiBlock>
    <ApiBlock example={examples.techniqueExample}>
      <>
        <ApiHeader path='/api/techniques' />
        <ApiParamBlock params={[
          {name: 'names', required: false, description: ''},
          {name: 'fields', required: false, description: ''},
        ]} />
      </>
    </ApiBlock>
    <ApiBlock example={examples.traitExample}>
      <>
        <ApiHeader path='/api/traits' />
        <ApiParamBlock params={[
          {name: 'names', required: false, description: ''},
          {name: 'fields', required: false, description: ''},
        ]} />
      </>
    </ApiBlock>
    <ApiBlock example={examples.gearExample}>
      <ApiHeader path='/api/gear' />
    </ApiBlock>
    <ApiBlock example={examples.weaknessesExample}>
      <ApiHeader path='/api/weaknesses' />
    </ApiBlock>
    <ApiBlock example={examples.weaknessCalculateExample}>
      <>
        <ApiHeader path='/api/weaknesses/calculate' />
        <ApiParamBlock params={[
          {name: 'attacking', required: false, description: ''},
          {name: 'defending', required: false, description: ''},
        ]} />
      </>
    </ApiBlock>
    <ApiBlock example={examples.breedingExample}>
      <ApiHeader path='/api/breeding' />
    </ApiBlock>
  </>
);
