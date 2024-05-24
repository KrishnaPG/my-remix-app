export default {
  icd9CodesForDiagnosis: `
    query icd9CodesForDiagnosis($diagnosis: String = "", $limit: Int = 10) {
      results: allDIcdDiagFixedsList(
        first: $limit
        filter: {longTitle: {startsWithInsensitive: $diagnosis}}
      ) {
        label: longTitle
        value: icd9Code
      }
    }
      `,
  PatientData: `
    query PatientData($subjectId: Int = 10) {
      patient: patientBySubjectId(subjectId: $subjectId) {
        dob
        dod
        expireFlag
        gender
        subjectId
        admissions: admissionsBySubjectIdList(orderBy: ADMITTIME_ASC) {
          admissionLocation
          admissionType
          admittime
          deathtime
          diagnosis
          dischargeLocation
          dischtime
          edouttime
          edregtime
          ethnicity
          hadmId
          hasCharteventsData
          hospitalExpireFlag
          insurance
          language
          maritalStatus
          religion
          services: servicesByHadmIdList(orderBy: TRANSFERTIME_ASC) {
            currService
            prevService
            transfertime
          }
          procedures: proceduresIcdsByHadmIdList(orderBy: SEQ_NUM_ASC) {
            icd9Code
            seqNum
          }
          notes: noteeventsByHadmIdList(orderBy: CHARTDATE_ASC) {
            category
            cgid
            chartdate
            charttime
            description
            iserror
            storetime
            text
            id
          }
          icustays: icustaysByHadmIdList(orderBy: INTIME_ASC) {
            dbsource
            firstCareunit
            firstWardid
            icustayId
            intime
            lastCareunit
            lastWardid
            los
            outtime
            vitalsFirstDay: vitalsFirstDaysByIcustayIdList {
              diasbpMax
              diasbpMean
              diasbpMin
              glucoseMax
              glucoseMean
              glucoseMin
              heartrateMax
              heartrateMean
              heartrateMin
              meanbpMax
              meanbpMean
              meanbpMin
              resprateMax
              resprateMean
              resprateMin
              spo2Max
              spo2Mean
              spo2Min
              sysbpMax
              sysbpMean
              sysbpMin
              tempcMax
              tempcMean
              tempcMin
            }
            transfers: transfersByIcustayIdList(orderBy: INTIME_ASC) {
              currCareunit
              currWardid
              dbsource
              eventtype
              intime
              los
              prevCareunit
              prevWardid
              outtime
            }
            procedureeventsMvs: procedureeventsMvsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              cancelreason
              cgid
              commentsCanceledby
              commentsDate
              commentsEditedby
              continueinnextdept
              endtime
              isopenbag
              itemid
              linkorderid
              location
              locationcategory
              ordercategorydescription
              ordercategoryname
              orderid
              secondaryordercategoryname
              starttime
              statusdescription
              storetime
              value
              valueuom
            }
            prescriptions: prescriptionsByIcustayIdList(orderBy: STARTDATE_ASC) {
              doseUnitRx
              doseValRx
              drug
              drugNameGeneric
              drugNamePoe
              drugType
              enddate
              formUnitDisp
              formValDisp
              formularyDrugCd
              gsn
              ndc
              prodStrength
              route
              startdate
            }
            phenylephrineDurations: phenylephrineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            outputevents: outputeventsByIcustayIdList(orderBy: ROW_ID_ASC) {
              valueuom
              value
              storetime
              stopped
              newbottle
              iserror
              id
              cgid
              charttime
            }
            oasis: oasisByIcustayIdList {
              oasis
              age
              ageScore
              electivesurgery
              electivesurgeryScore
              gcs
              gcsScore
              heartrate
              heartrateScore
              hospitalExpireFlag
              icustayAgeGroup
              icustayExpireFlag
              meanbp
              meanbpScore
              mechvent
              mechventScore
              oasisProb
              preiculos
              preiculosScore
              resprate
              resprateScore
              temp
              tempScore
              urineoutput
              urineoutputScore
            }
            norepinephrineDurations: norepinephrineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            milrinoneDurations: milrinoneDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            melds: meldsByIcustayIdList {
              sodiumMin
              rrt
              meldInitial
              meld
              inrMax
              creatinineMax
              bilirubinMax
            }
            lods: lodsByIcustayIdList {
              cardiovascular
              hematologic
              hepatic
              lods
              neurologic
              pulmonary
              renal
            }
            labsFirstDay: labsFirstDaysByIcustayIdList {
              albuminMax
              albuminMin
              aniongapMax
              aniongapMin
              bandsMax
              bandsMin
              bicarbonateMax
              bicarbonateMin
              bilirubinMax
              bilirubinMin
              bunMax
              bunMin
              chlorideMax
              chlorideMin
              creatinineMax
              creatinineMin
              glucoseMax
              glucoseMin
              hematocritMax
              hematocritMin
              hemoglobinMax
              hemoglobinMin
              inrMax
              inrMin
              lactateMax
              lactateMin
              plateletMax
              plateletMin
              potassiumMax
              potassiumMin
              ptMax
              ptMin
              pttMax
              pttMin
              sodiumMax
              sodiumMin
              wbcMax
              wbcMin
            }
            kdigoUos: kdigoUosByIcustayIdList(orderBy: CHARTTIME_ASC) {
              charttime
              icustayId
              uoRt12Hr
              uoRt24Hr
              uoRt6Hr
              uoTm12Hr
              uoTm24Hr
              uoTm6Hr
              urineoutput12Hr
              urineoutput24Hr
              urineoutput6Hr
              weight
            }
            isuprelDurations: isuprelDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            inputeventsMvs: inputeventsMvsByIcustayIdList(orderBy: STARTTIME_ASC) {
              amountuom
              cancelreason
              amount
              cgid
              commentsCanceledby
              commentsDate
              commentsEditedby
              continueinnextdept
              endtime
              isopenbag
              itemid
              linkorderid
              ordercategorydescription
              ordercategoryname
              ordercomponenttypedescription
              orderid
              originalamount
              originalrate
              patientweight
              rate
              rateuom
              secondaryordercategoryname
              starttime
              statusdescription
              storetime
              totalamount
              totalamountuom
            }
            gcsFirstDay: gcsFirstDaysByIcustayIdList {
              endotrachflag
              gcseyes
              gcsmotor
              gcsverbal
              mingcs
            }
            epinephrineDurations: epinephrineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            dopamineDurations: dopamineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            dobutamineDurations: dobutamineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              vasonum
              starttime
              endtime
              durationHours
            }
            crrtDurations: crrtDurationsByIcustayIdList(orderBy: STARTTIME_ASC) {
              durationHours
              endtime
              num
              starttime
            }
            bloodGasFirstDay: bloodGasFirstDaysByIcustayIdList(
              orderBy: CHARTTIME_ASC
            ) {
              aado2
              baseexcess
              bicarbonate
              calcium
              carboxyhemoglobin
              charttime
              chloride
              fio2
              glucose
              hematocrit
              hemoglobin
              intubated
              lactate
              methemoglobin
              o2Flow
              pco2
              peep
              ph
              po2
              potassium
              requiredo2
              so2
              sodium
              specimen
              temperature
              tidalvolume
              ventilationrate
              totalco2
              ventilator
            }
            bloodGasFirstDayArterial: bloodGasFirstDayArterialsByIcustayIdList(
              orderBy: CHARTTIME_ASC
            ) {
              aado2
              aado2Calc
              baseexcess
              bicarbonate
              calcium
              carboxyhemoglobin
              charttime
              chloride
              fio2
              fio2Chartevents
              glucose
              hematocrit
              hemoglobin
              ventilator
              ventilationrate
              totalco2
              tidalvolume
              temperature
              spo2
              specimenProb
              specimenPred
              specimen
              sodium
              so2
              requiredo2
              potassium
              po2
              ph
              peep
              pco2
              lactate
              methemoglobin
              o2Flow
              pao2Fio2
              intubated
            }
            rrtFirstDay: rrtFirstDaysByIcustayIdList {
              rrt
            }
            saps: sapsByIcustayIdList {
              saps
              wbcScore
              ventScore
              uoScore
              tempScore
              sysbpScore
              sodiumScore
              respScore
              potassiumScore
              hrScore
              hematocritScore
              glucoseScore
              gcsScore
              bunScore
              bicarbonateScore
              ageScore
            }
            sofas: sofasByIcustayIdList {
              cns
              cardiovascular
              coagulation
              liver
              renal
              respiration
              sofa
            }
            sirs: sirsByIcustayIdList {
              wbcScore
              tempScore
              sirs
              respScore
              heartrateScore
            }
            sapsiis: sapsiisByIcustayIdList {
              admissiontypeScore
              ageScore
              bicarbonateScore
              bilirubinScore
              bunScore
              comorbidityScore
              gcsScore
              hrScore
              pao2Fio2Score
              potassiumScore
              sapsii
              sapsiiProb
              sodiumScore
              sysbpScore
              tempScore
              uoScore
              wbcScore
            }
            apsiiis: apsiiisByIcustayIdList {
              acidbaseScore
              apsiii
              albuminScore
              apsiiiProb
              bilirubinScore
              bunScore
              creatinineScore
              gcsScore
              glucoseScore
              hematocritScore
              hrScore
              meanbpScore
              wbcScore
              uoScore
              tempScore
              sodiumScore
              resprateScore
              pao2Aado2Score
            }
            adenosineDurations: adenosineDurationsByIcustayIdList(
              orderBy: STARTTIME_ASC
            ) {
              durationHours
              endtime
              starttime
              vasonum
            }
            codeStatuses: codeStatusesByIcustayIdList {
              subjectId
              hadmId
              icustayId
              fullcodeFirst
              cmoFirst
              dnrFirst
              dniFirst
              dncprFirst
              fullcodeLast
              cmoLast
              dnrLast
              dniLast
              dncprLast
              fullcode
              cmo
              dnr
              dni
              dncpr
              dnrFirstCharttime
              dniFirstCharttime
              dncprFirstCharttime
              timecmoChart
            }
            inputeventsCvs: inputeventsCvsByIcustayIdList(orderBy: CHARTTIME_ASC) {
              amount
              amountuom
              cgid
              charttime
              itemid
              linkorderid
              newbottle
              orderid
              originalamount
              originalamountuom
              originalrate
              originalrateuom
              originalroute
              originalsite
              rate
              rateuom
              rowId
              stopped
              storetime
            }
            kdigoCreatinine: kdigoCreatininesByIcustayIdList(
              orderBy: CHARTTIME_ASC
            ) {
              charttime
              creat
              creatLowPast48Hr
              creatLowPast7Day
            }
            kdigoStages: kdigoStagesByIcustayIdList(orderBy: CHARTTIME_ASC) {
              akiStage
              akiStageCreat
              akiStageUo
              charttime
              creat
              uoRt12Hr
              uoRt24Hr
              uoRt6Hr
            }
          }
          cptevents: cpteventsByHadmIdList(orderBy: CHARTDATE_ASC) {
            chartdate
            costcenter
            cptCd
            cptNumber
            cptSuffix
            description
            sectionheader
            subsectionheader
            ticketIdSeq
          }
          callouts: calloutsByHadmIdList(orderBy: CREATETIME_ASC) {
            calloutOutcome
            acknowledgeStatus
            acknowledgetime
            calloutService
            calloutStatus
            calloutWardid
            createtime
            currCareunit
            currWardid
            currentreservationtime
            dischargeWardid
            firstreservationtime
            outcometime
            requestCdiff
            requestMrsa
            requestResp
            requestTele
            requestVre
            rowId
            submitCareunit
            submitWardid
            updatetime
          }
          angus: angusesByHadmIdList {
            angus
            explicitSepsis
            infection
            mechVent
            organDysfunction
          }
        }
      }
    }
      `,
  PatientList: `
    query PatientList($offset: Int = 0, $limit: Int = 10) {
      allPatients(offset: $offset, first: $limit) {
        totalCount
        nodes {
          gender
          dob
          dod
          subjectId
          admissions: admissionsBySubjectId {
            totalCount
          }
          icuStays: icustaysBySubjectIdList {
            los
          }
          drgCodes: drgcodesBySubjectIdList(orderBy: DRG_SEVERITY_DESC) {
            hadmId
            drgSeverity
            drgCode
            description
            drgMortality
            drgType
          }
        }
      }
    }
      `,
  // returns all patients that are diagonised with a given disease(ICD code)
  PatientsDiagnosedWith: (seqFilterCond = 'equalTo') => `
    query PatientsDiagnosedWith($icd9Code: String = "42731", $seqNum: Int = 1) {
      results: allDiagnosesIcdsList(
        condition: {icd9Code: $icd9Code}
        filter: {seqNum: {${seqFilterCond}: $seqNum}}
        orderBy: HADM_ID_ASC
      ) {
        admission: admissionByHadmId {
          hadmId
          admissionAge
          deathAge
          diagnosis
          ethnicity
          ethnicityGrouped
          firstHospStay
          gender
          hospitalExpireFlag
          insurance
          language
          losHospital
          maritalStatus
          religion
          subjectId
        }
        seqNum
      }
    }
      `,
};
